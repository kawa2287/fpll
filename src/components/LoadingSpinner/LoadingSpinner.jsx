import { Text } from 'native-base';
import { Fragment } from 'react';
import { Triangle } from 'react-loader-spinner';

/**
 *
 * @param {object} props
 * @param {string} props.height
 * @param {string} props.width
 * @param {boolean} props.visible
 */
const LoadingSpinner = (props) => {
    const { height, width, visible } = props;
    return (
        <Triangle
            height={height}
            width={width}
            color={'gray'}
            visible={visible}
        />
    );
};

export default LoadingSpinner;
