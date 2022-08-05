import { Text } from 'native-base';
import { Fragment } from 'react';
import { Triangle } from 'react-loader-spinner';

/**
 *
 * @param {object} props
 * @param {string} props.height
 * @param {string} props.width
 * @param {string} props.color
 * @param {boolean} props.visible
 */
const LoadingSpinner = (props) => {
    const { height, width, color, visible } = props;
    return (
        <Triangle
            height={height}
            width={width}
            color={color}
            visible={visible}
        />
    );
};

export default LoadingSpinner;
