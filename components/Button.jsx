import { Button as Btn } from "react-native-paper";

const Button = (props) => {
    return (
        <Btn
            style={{
                borderRadius: 0,
                paddingVertical: 5,
                width: "100%",
            }}
            {...props}
        >
            {props.children}
        </Btn>
    );
};

export default Button;
