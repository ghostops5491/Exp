fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios get_dev_cert_and_profile
```
fastlane ios get_dev_cert_and_profile
```

### ios get_release_cert_and_profile
```
fastlane ios get_release_cert_and_profile
```

### ios build_release
```
fastlane ios build_release
```

### ios build_staging
```
fastlane ios build_staging
```

### ios compile
```
fastlane ios compile
```

### ios increment
```
fastlane ios increment
```

### ios create_app
```
fastlane ios create_app
```

### ios deliver_app
```
fastlane ios deliver_app
```

### ios submit_beta
```
fastlane ios submit_beta
```

### ios submit_release
```
fastlane ios submit_release
```


----

## Android
### android submit_beta
```
fastlane android submit_beta
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
