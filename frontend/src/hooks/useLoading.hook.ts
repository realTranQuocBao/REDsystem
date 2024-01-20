import { useEffect } from 'react';

const useLoading = (loading: boolean) => {
    const removeLoading = () => {
        // Your removeLoading logic here
        $("#status").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        $("body").delay(350).css({
            overflow: "visible"
        });
    };

    const insertLoading = () => {
        // Your insertLoading logic here
        $("#preloader").fadeIn();
        $("#status").fadeIn();
    };

    useEffect(() => {
        console.log("infor", loading ? "loading" : "noLoading");
        if (loading) {
            insertLoading();
        } else {
            removeLoading();
        }
    }, [loading]);
};

export default useLoading;