from django.contrib.auth.hashers import is_password_usable, get_hasher, identify_hasher


def check_password(password, encoded, setter=None, preferred="default"):
    if password is None or not is_password_usable(encoded):
        return False

    preferred = get_hasher(preferred)
    try:
        hasher = identify_hasher(encoded)
    except ValueError:
        return False

    hasher_changed = hasher.algorithm != preferred.algorithm
    must_update = hasher_changed or preferred.must_update(encoded)

    is_correct = password == encoded

    if not is_correct and not hasher_changed and must_update:
        hasher.harden_runtime(password, encoded)

    if setter and is_correct and must_update:
        setter(password)
    return is_correct
