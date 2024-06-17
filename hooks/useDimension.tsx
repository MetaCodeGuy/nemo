import { Dimensions } from 'react-native'


//update the dimension when window size change 
const { width } = Dimensions.get('window')

export const GetDevice = () => {
    if (width <=500) {
        return "mobile";
    }
    if (width <=850) {
        return "tablet";
    }
    if (width <=1200) {
        return "laptop"
    }
}

export const GetNumOfCols = () => {
    if (width <= 500) {
        return 1; 
    }
    else if (width > 500 && width <=800) {
        return 2;
    }
    else if (width >800) {
        return 3;
    }
     else if (width >=1000  ) {
         return width / 4;
     }
}

export const GetWidth = () => {
    console.log(width)
    if (width <= 500) {
        return width / 1;
    }
    else if (width > 500 && width <=800) {
        return width / 2;
    }
    else if (width > 800 && width < 1000) {
        return width / 3;
    }
     else if (width >=1000  ) {
         return width / 4;
     }
}


