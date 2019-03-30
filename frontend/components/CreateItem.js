import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Cool Shoes",
    description: " I Love those context",
    image: "shoes.jpg",
    largeImage: "shoessss.jpg",
    price: 699
  };

  handleChange = event => {
    const { name, value, type } = event.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  render() {
    const { title, description, image, largeImage, price } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createItem();
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={title}
                onChange={this.handleChange}
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="price"
                required
                value={price}
                onChange={this.handleChange}
              />
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="description"
                required
                value={description}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
