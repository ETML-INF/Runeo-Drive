import Axios from "axios";
import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import { ButtonComponent } from "../common/component/ButtonComponent";
import { TextInputComponent } from "../common/component/TextInput.component";
import * as ImagePicker from "expo-image-picker";
import { AuthContainer } from "../Provider.component";
import * as Yup from "yup";
import { Formik, FormikHelpers, ErrorMessage } from "formik";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { UsersContainer } from "../Provider.component";
import { LogBox } from 'react-native';

const ConfirmState = (props: any) => {
  const usersContainer  = UsersContainer.useContainer();
  const { authenticatedUser } = AuthContainer.useContainer();
  const [chartSelected, setChartSelected] = useState(false);
  const [error,setError]=useState("");
  let imageBase64: string;
  async function storeImage() {
    let result: ImagePicker.ImagePickerResult;
    try {
      result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled)
        imageBase64 = result.base64!;
    } catch (error) {
      throw error.message;
    }
  }
  const onSubmit = async (userInfo:Object, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
    let isValid = true;
    usersContainer.items.forEach((user)=>{  
      if(user.name == userInfo.name)
      {
        isValid = false;
        setFieldError("name","Le pseudo est déjà utilisé.");
      }
    })
    if(!chartSelected)
    {
      isValid = false;
      setError("Vous n'avez pas acceptez la charte.");
    }
      
    if(!imageBase64){
      isValid = false;
      debugger;
      setError("Vous n'avez pas ajouter d'image.")
    }
    if(isValid) {
      try {
        let res = await Axios.patch(`/users/${authenticatedUser?.id}`, {
          name: userInfo.name,
          lastname: userInfo.lastname,
          firstname: userInfo.firstname,
        });
        let imgRes = await Axios.patch(`/users/${authenticatedUser?.id}`, {
          image_license: "data:image/png;base64,"+imageBase64,
        });
        if (res.status == 200 && imgRes.status == 200) {
          props.setNewState(4);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const onCancel = async () => {
    props.setNewState(2);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        name: authenticatedUser?.name,
        lastname: authenticatedUser?.lastname,
        firstname: authenticatedUser?.firstname,
        phone_number: authenticatedUser?.phone_number,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(2).required(),
      })}
    >
      {(formik) => (
        <View>
        <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10, color:"red" }}>
          {error}
        </Text>
         
          <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>
            Permis de conduire
          </Text>
          <View style={{ marginTop: 10 }}>
            <ButtonComponent
              title="Importer permis de conduire"
              onPress={storeImage}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}
            >
              Pseudo
            </Text>
            <TextInputComponent
              name={"name"}
              formik={formik}
              inputProps={{
                placeholder: "Pseudo",
              }}
            />
          </View>
          <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>
            Vous avez lu et accepté la{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() =>
                Linking.openURL("https://runeo.mycpnv.ch/infos#charte")
              }
            >
              charte.
            </Text>
          </Text>

          <CheckBox
            name={"charteCheckbox"}
            checked={chartSelected}
            onPress={() => setChartSelected(!chartSelected)}
          />
          <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>
            Nom
          </Text>
          <TextInputComponent
            name={"lastname"}
            formik={formik}
            inputProps={{
              placeholder: "Nom",
              disabled: true,
            }}
          />
          <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>
            Prénom
          </Text>
          <TextInputComponent
            name={"firstname"}
            formik={formik}
            inputProps={{
              placeholder: "Prénom",
              disabled: true,
              value: "test",
            }}
          />
          <Text style={{ fontFamily: "Montserrat-ExtraBold", marginLeft: 10 }}>
            Numéro de téléphone
          </Text>
          <TextInputComponent
            name={"phone_number"}
            formik={formik}
            inputProps={{
              placeholder: "Numéro",
              disabled: true,
            }}
          />
          <View style={{ marginTop: 10 }}>
            <ButtonComponent
              title="Valider"
              onPress={formik.handleSubmit}
              disabled={formik.isSubmitting || !formik.isValid}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <ButtonComponent
              title="Annuler"
              onPress={onCancel}
              disabled={formik.isSubmitting}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
export default ConfirmState;
