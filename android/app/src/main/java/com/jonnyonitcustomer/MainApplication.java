package com.jonnyonitcustomer;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.testfairy.react.TestFairyPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import io.sentry.RNSentryPackage;
import com.cardio.RNCardIOPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new TestFairyPackage(),
            new RCTCameraPackage(),
            new RNSentryPackage(MainApplication.this),
            new RNCardIOPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
