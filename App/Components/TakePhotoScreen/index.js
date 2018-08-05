import React, { Component } from "react"
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Platform
} from "react-native"
import { Button, Text } from "native-base"
import { Images, Colors, Fonts } from "App/Themes"
import styles from "./styles"
import Camera from "react-native-camera"

const { height, width } = Dimensions.get("window")

export default class TakePhotoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagePath: null,
      imageCaptured: false,
      cameraSide: "back"
    }
  }

  takePicture() {
    const options = { jpegQuality: 100 }

    this.camera
      .capture({ metadata: options })
      .then(data => {
        this.camera.path = data.path
        this.setState({ imagePath: data.path, imageCaptured: true })
      })
      .catch(console.error)
  }

  retakePicture() {
    this.setState({
      imagePath: null,
      imageCaptured: false
    })
  }

  render() {
    const {
      visible,
      onRequestClose,
      textToDisplay,
      captureImageUri,
      cameraSide
    } = this.props
    const { imagePath, imageCaptured } = this.state
    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.topText}>{textToDisplay}</Text>
            <TouchableOpacity
              onPress={() => onRequestClose()}
              style={styles.closeButton}
            >
              <Image
                style={styles.closeButtonImage}
                source={Images.exitClose}
              />
            </TouchableOpacity>
          </View>

          {imagePath ? (
            <Image
              style={styles.imagePreview}
              source={{ uri: imagePath }}
            /> /*  SHOW IMAGE PREVIEW  */
          ) : (
            <Camera /* SHOW CAMERA SCREEN TO TAKE IMAGE */
              ref={cam => (this.camera = cam)}
              style={styles.camera}
              aspect={Camera.constants.Aspect.fill}
              type={Camera.constants.Type[cameraSide || "back"]}
              path={this.imagePath}
            />
          )}
          <View style={styles.bottomBar}>
            {!imageCaptured ? (
              <Button
                primary
                style={styles.button}
                onPress={this.takePicture.bind(this)}
              >
                <Text style={{ width: "100%", color: "white", fontSize: 18 }}>
                  CAPTURE
                </Text>
              </Button>
            ) : (
              <Button
                primary
                style={styles.button}
                onPress={this.retakePicture.bind(this)}
              >
                <Text style={{ width: "100%", color: "white", fontSize: 18 }}>
                  RETAKE
                </Text>
              </Button>
            )}
            <Button
              primary
              disabled={!imageCaptured}
              onPress={() => {
                captureImageUri(imagePath)
                onRequestClose()
                this.setState({
                  imagePath: null,
                  imageCaptured: false
                })
              }}
              style={[
                !imageCaptured
                  ? styles.buttonConfirmInactive
                  : styles.buttonConfirmActive
              ]}
            >
              <Text style={{ width: "100%", color: "white", fontSize: 18 }}>
                CONFIRM
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    )
  }
}
