from rest_framework.routers import DefaultRouter


class CustomRouter(DefaultRouter):
    def get_method_map(self, viewset, method_map):
        url_map = {}
        bound_methods = super().get_method_map(viewset, method_map)
        allowed_action = ['check_phone', 'favourites', 'favourite', 'likes', 'like', 'created_events', 'created_event',
                          'authors', 'selected_events', 'selected_event', 'become_lector', 'upload_image']

        for method, action in bound_methods.items():
            if method not in ['post', 'delete', 'put', 'get', 'patch'] or \
                    action in ['create', 'me'] and method not in ['put', 'delete'] or action in allowed_action:
                url_map[method] = action

        return url_map
