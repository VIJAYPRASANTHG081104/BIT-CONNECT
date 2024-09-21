import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const SearchAccount = ({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfo,
  setVisible,
}) => {

  const validateEmail = Yup.object({
    email: Yup.string()
      // .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
  });


  const handleSearch = async() => {

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/finduser`,
        { email }
      );
      setUserInfo(data);
      setVisible(1);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Find your account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account
      </div>
      <Formik
        enableReinitialize
        initialValues={email}
        
        onSubmit={() => {
          handleSearch();
        }}
        validationSchema={validateEmail}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Email address or phone number"}
            />
            {error && <div className="error_text">{error}</div>}

            <div className="reset_form_btns">
              <Link to={"/login"} className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;
