import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Please insert a valid title")
        .required("Remember to add your complete title"),
        price: Yup.number()
        .typeError("Price must be a number")
        .integer("Please insert a valid Price")
        .min(0, "Please insert a valid Price")
        .required("Price is required"),
        stock: Yup.number()
        .typeError("Stock must be a number")
        .integer("Please insert a valid Stock")
        .min(0, "Please insert a valid Stock")
        .required("Stock is required"),
        image: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please URL image'),
});

export default createProductSchema;
