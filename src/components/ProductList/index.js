import React, { Fragment } from "react";
import { Text } from "@sitecore-jss/sitecore-jss-react";
import { ListGroup, ListGroupItem } from "reactstrap";
require("isomorphic-fetch");

class ProductList extends React.Component {
  state = {
    products: [],
    loading: true
  };

  componentDidMount() {
    const { params } = this.props;
    const top = params && params.top ? params.top : 1;

    const uri = `http://sc910.sc/sitecore/api/ssc/aggregate/content/Items('%7BB0C31187-CA0F-594D-97AF-0873B4323266%7D')/Children?sc_apikey=%7BF331343E-A6B0-4CCC-A0FD-85C7D244B751%7D&$top=${top}`;

    fetch(uri)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        const products = data.value;
        if (products) {
          this.setState({ products: products, loading: false });
        }
      });
  }

  render() {
    const { loading, products } = this.state;
    const { fields } = this.props;
    if (loading) {
      return <h1>Loading products...</h1>;
    }

    return (
      <Fragment>
        <Text tag="h1" field={fields.heading} className="display-3" />
        <ListGroup>
          {products.map((product, index) => (
            <ListGroupItem key={index}>
              <h6>{product.DisplayName}</h6>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Fragment>
    );
  }
}

export default ProductList;
