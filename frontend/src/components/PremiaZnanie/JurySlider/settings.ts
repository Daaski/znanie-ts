const slickSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                speed: 500,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                speed: 500,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                infinite: true,
                centerPadding: '45px',
                speed: 500,
            },
        },
    ],
};

export default slickSettings;
