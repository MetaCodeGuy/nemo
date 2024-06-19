import { Dimensions } from 'react-native'


//update the dimension when window size change 
const { width } = Dimensions.get('window')

export const GetDevice = () => {
    if (width <= 500) {
        return "mobile";
    }
    if (width <= 850) {
        return "tablet";
    }
    if (width <= 1200) {
        return "laptop"
    }
}

export const GetNumOfCols = () => {
    if (width <= 500) {
        return 2;
    }
    else if (width > 500 && width <= 600) {
        return 3;
    }
    else if (width > 600) {
        return 4;
    }
    else if (width >= 700) {
        return 5;
    }
}

export const GetWidth = () => { 
    if (width <= 500) {
        return width / 2;
    }
    else if (width > 500 && width <= 600) {
        return width / 3;
    }
    else if (width > 600) {
        return width / 4;
    }
    else if (width >= 700) {
        return width / 5;
    }
}


export const GetHeight = (imgwidth: number, imgheight: number) => {
    if (imgwidth < imgheight) {
        return 350
    }
    else if (imgheight < imgwidth) {
        return 200
    }
}
 


