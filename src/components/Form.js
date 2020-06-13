import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  Form,
  FormGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Button,
} from "reactstrap";
import axios from "axios";
import * as yup from "yup";

const OrderForm = () => {
  // state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //This state handles the drop down menu
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    sauce: "",
    protein: "",
    pineapple: false,
    onion: false,
    pepper: false,
    tomatoes: false,
    cheese: false,
    special: "",
  });

  //   Validation
  const schema = yup.object().shape({
    name: yup.string().required("Please Include Your Full Name").min(2),
    size: yup.string().required("Must include pizza size"),
    sauce: yup.string().required(),
    protein: yup.string().required(),
    special: yup.string(),
    pineapple: yup.boolean(),
    onion: yup.boolean(),
    pepper: yup.boolean(),
    cheese: yup.boolean(),
    tomatoes: yup.boolean(),
  });


  //submit form
  const submit = () => {
    schema.validate(formData).then(() => {
        axios
        .post('https://reqres.in/api/users', formData)
        .then((res) => {
            console.log(res.data, 'this is your posted data')

            //reset information on form
            setFormData({
                name: "",
                size: "",
                sauce: "",
                protein: "",
                pineapple: false,
                onion: false,
                pepper: false,
                tomatoes: false,
                cheese: false,
                special: "",
            });
        })
        .catch(err => console.log(err.response));

    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    submit();
  }

  //Making the button clickable until the whole form is submitted
  useEffect(() => {
    schema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToppings = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const toggle = () => setDropDownOpen((prevState) => !prevState);

  return (
    <>
      <Card color="info" style={{ margin: "40px auto" }}>
        <h2 style={{ color: "white", margin: "20px auto" }}>
          Create your own Pizza!
        </h2>
        <CardImg
          style={{ width: "80%", margin: "0 auto" }}
          src={require("../img/pizza-2.jpg")}
        />
      </Card>
      <Form onSubmit={formSubmit} style={{ margin: "20px auto", width: "50%" }}>
        <FormGroup>
          <legend>Name</legend>
          <Input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-cy="name"
          />
        </FormGroup>

        {/* To Select the pizza size */}

        <FormGroup>
          <Dropdown isOpen={dropDownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {formData.size === 0 ? "Select Your Pizza Size" : formData.size}
            </DropdownToggle>
            <DropdownMenu>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: 0 });
                }}
              >
                --Select Your Size--
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "Small" });
                }}
              >
                Small
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "Medium" });
                }}
              >
                Medium
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "Large" });
                }}
              >
                Large
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "Extra-Large" });
                }}
              >
                Extra Large
              </div>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>

        {/* form for the sauces */}

        <FormGroup tag="fieldset">
          <legend>Sauce</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="original red"
                onChange={handleChange}
              />
              Original Red
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="garlic-ranch"
                onChange={handleChange}
              />
              Garlic Ranch
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="bbq-sauce"
                onChange={handleChange}
              />
              BBQ Sauce
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="spinach-alfredo"
                onChange={handleChange}
              />
              Spinach Alfredo
            </Label>
          </FormGroup>
        </FormGroup>

        {/* form for proteins */}

        <FormGroup tag="fieldset">
          <legend>Protein</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="beef"
                onChange={handleChange}
              />
              Beef
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="chicken"
                onChange={handleChange}
              />
              Chicken
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="pork"
                onChange={handleChange}
              />
              Pork
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="pepperoni"
                onChange={handleChange}
              />
              Pepperoni
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="sausage"
                onChange={handleChange}
              />
              Sausage
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="bacon"
                onChange={handleChange}
              />
              Bacon
            </Label>
          </FormGroup>
        </FormGroup>

        {/* form for the toppings */}

        <FormGroup tag="fieldset">
          <legend>Toppings</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="pineapple"
                checked={formData.pineapple}
                onChange={handleToppings}
                data-cy="pineapple"
              />
              Pineapple
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="onion"
                checked={formData.onion}
                onChange={handleToppings}
                data-cy="onion"
              />
              Onion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="pepper"
                checked={formData.pepper}
                onChange={handleToppings}
                data-cy="pepper"
              />
              Green Pepper
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="tomatoes"
                checked={formData.tomatoes}
                onChange={handleToppings}
                data-cy="tomatoes"
              />
              Diced Tomatoes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="cheese"
                checked={formData.cheese}
                onChange={handleToppings}
                data-cy="cheese"
              />
              Cheese
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <legend>Special Instructions</legend>
          <Input
            type="textarea"
            name="special"
            value={formData.special}
            onChange={handleChange}
          />
        </FormGroup>

        <Button data-cy="submit" disabled={buttonDisabled}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default OrderForm;
