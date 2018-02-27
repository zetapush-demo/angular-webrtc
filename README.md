# Android WebRTC

This android app need to have a ZetaPush recipe :


**recipe.zms :**

    recipe com.zetapush.visio 1.0.0;

    import recipe com.zetapush.core.utils 1.0.0 in zpRecipeUtils;
    import recipe com.zetapush.core.visio 1.0.0 in zpRecipeVisio;
    import recipe com.zetapush.core.room 1.0.0 in zpRecipeRoom;
    import recipe com.zetapush.core.user 1.0.0 in zpRecipeUser;


**init.zms :**

    // USER FOR THE ANDROID VERSION
    sudo zpRecipeUtils::GLOBAL_OWNER call zpRecipeUser::createUser({
        login: "android",
        password: "password",
        fields: {
            email: "zp-android@yopmail.com"
        }
    });

    // USER FOR THE WEB VERSION
    sudo zpRecipeUtils::GLOBAL_OWNER call zpRecipeUser::createUser({
        login: "web",
        password: "password",
        fields: {
            email: "zp-web@yopmail.com"
        }
    });


The init.zms is only useful to already have 2 created users