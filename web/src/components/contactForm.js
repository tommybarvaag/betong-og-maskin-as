import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  title: {
    width: "100%",
    paddingTop: "80px",
    textAlign: "center",
    margin: theme.spacing(0, 0, 2)
  },
  description: {
    textAlign: "center"
  },
  contactForm: {
    margin: "0 auto"
  },
  textField: {
    width: "100%"
  },
  button: {
    textTransform: "none",
    margin: theme.spacing(2, 0, 0)
  }
}));

export default function ContactForm() {
  const classes = useStyles();

  const [submitting, setSubmitting] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");

  const [nameValid, setNameValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [textValid, setTextValid] = React.useState(true);

  const validateString = (input, setFunc) => {
    const result = input !== null && input !== undefined && input !== "";

    if (setFunc) {
      setFunc(result);
    }

    return result;
  };

  const validateEmail = (input, setFunc) => {
    const result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(
      input
    );

    if (setFunc) {
      setFunc(result);
    }

    return result;
  };

  const onFormSubmit = () => {
    const nameValidationResult = validateString(name, setNameValid);
    const emailValidationResult = validateEmail(email, setEmailValid);
    const textValidationResult = validateString(text, setTextValid);

    if (nameValidationResult && emailValidationResult && textValidationResult) {
      setSubmitting(true);
      fetch("/api/sendMail", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          text: text
        })
      });
    }
  };

  const renderContactFormContent = () => {
    if (submitting) {
      return (
        <>
          <Typography variant="h2" className={classes.title}>
            Takk!
          </Typography>
          <Typography className={classes.description} paragraph>
            Du hører fra oss snart.
          </Typography>
        </>
      );
    }

    return (
      <>
        <Typography variant="h2" className={classes.title}>
          Ønsker du at vi kontakter deg?
        </Typography>
        <Typography className={classes.description} paragraph>
          Bruk skjemaet nedenfor, så kontakter vi deg.
        </Typography>
        <Container maxWidth="sm">
          <form>
            <TextField
              id="full-name"
              label="Fornavn og etternavn"
              error={!nameValid}
              type="text"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={event => {
                setName(event.target.value);
                validateString(event.target.value, setNameValid);
              }}
              required
            />
            <TextField
              id="email-address"
              label="E-post"
              error={!emailValid}
              type="email"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={event => {
                setEmail(event.target.value);
                validateEmail(event.target.value, setEmailValid);
              }}
              required
            />
            <TextField
              id="text"
              label="Tekst"
              error={!textValid}
              placeholder="Hei Betong & Maskin AS, jeg er interessert i noen av tjenestene dere leverer..."
              multiline
              className={classes.textField}
              margin="normal"
              variant="outlined"
              required
              onChange={event => {
                setText(event.target.value);
                validateString(text, setTextValid);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onFormSubmit}
            >
              Send
            </Button>
          </form>
        </Container>
      </>
    );
  };

  return (
    <Container maxWidth="md" className={classes.contactForm}>
      {renderContactFormContent()}
    </Container>
  );
}
