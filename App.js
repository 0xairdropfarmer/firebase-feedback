import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput as Input,
  Button,
  HelperText,
  Appbar,
} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import database from '@react-native-firebase/database';
const FeedbackSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  message: Yup.string()
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
});

export default () => {
  const submitForm = (values) => {
    database()
      .ref('feedback')
      .push(values)
      .then((res) => {
        console.log(res);
        alert('thank for giving feedback');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Formik
      initialValues={{email: '', name: '', message: ''}}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        submitForm(values);
        setSubmitting(false);
      }}
      validationSchema={FeedbackSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        dirty,
        errors,
        touched,
        isSubmitting,
      }) => (
        <KeyboardAwareScrollView style={styles.container}>
          <Appbar.Header>
            <Appbar.Content
              title="Feedback"
              subtitle={'if your have any feedback send us below'}
            />
            <Appbar.Action icon="email" onPress={() => {}} />
          </Appbar.Header>
          <View style={styles.wrapper}>
            <Input
              placeholder={'Name'}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              underlineColor="transparent"
              mode="outlined"
              style={styles.inputContainerStyle}
            />
            <HelperText type="error" visible={errors.name && touched.name}>
              {errors.name}
            </HelperText>
            <Input
              placeholder={'Email'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              underlineColor="transparent"
              mode="outlined"
              style={styles.inputContainerStyle}
            />
            <HelperText type="error" visible={errors.email && touched.email}>
              {' '}
              {errors.email}
            </HelperText>
            <Input
              placeholder={'Message'}
              onChangeText={handleChange('message')}
              onBlur={handleBlur('message')}
              value={values.message}
              underlineColor="transparent"
              mode="outlined"
              multiline={true}
              numberOfLines={12}
              style={(styles.inputContainerStyle, styles.textArea)}
            />
            <HelperText
              type="error"
              visible={errors.message && touched.message}>
              {' '}
              {errors.message}
            </HelperText>
            <View>
              <Button
                icon="email"
                disabled={!isValid}
                mode="contained"
                onPress={handleSubmit}>
                Submit
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  btnSubmit: {
    // width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 3,
    padding: 3,
  },
  fontSize: {
    fontSize: 24,
  },
  textArea: {
    height: 200,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
