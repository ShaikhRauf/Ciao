import * as actionTypes from "../action";
import { ActionType } from "./types";
import * as actionTypes2 from "../action/action_utils/actionTypes";
const initialState = {
  unitCodeList :[],
  progressCardAttendance:null,
  unitCodeArray:[],

};
class unitCode{
   name:string
   attendanceArray:any
   assessmentArray:any
   gradesArray:any
}

// class unitCode{
//   name:string
//   attendanceArray:any
// }
const progressCardReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.GET_UNIT_CODE_RESPONSE: {
      const unitCodeTempArray:any=[];
      action.payload.forEach(element => {
          let unit=new unitCode();
          unit.name=element.name;
          unit.attendanceArray=undefined;
          unitCodeTempArray.push(unit);
      });
      return {
        ...state,
        unitCodeList: action.payload,
        unitCodeArray:unitCodeTempArray
      };
    }

    case actionTypes.PROGRESSION_CARD_RESPONSE: {
        const unitCodeTempArray:any=[];
        state.unitCodeArray.forEach(element => {
          let unit=new unitCode();
          unit.name=element.name;
          unit.attendanceArray=element.attendanceArray;
            if(element.name==action.payload.unitcode)
            {
              unit.attendanceArray=action.payload.data
            }
            unitCodeTempArray.push(unit);
        });
        return {...state,
          progressCardAttendance: action.payload.data,
          unitCodeArray:unitCodeTempArray
        };
        // return Object.assign( state, {
        //   progressCardAttendance: action.payload
        // }) 
      }
      case actionTypes.ASSESSMENT_RESPONSE: {
        const unitCodeTempArray:any=[];
        state.unitCodeArray.forEach(element => {
          let unit=new unitCode();
          unit.name=element.name;

          unit.assessmentArray=element.assessmentArray;
            if(element.name==action.payload.unitcode)
            {
              unit.assessmentArray=action.payload.data;
              
            }
            unitCodeTempArray.push(unit);
        });
        return {...state,
          unitCodeArray:unitCodeTempArray
        };

        
      
      }
      case actionTypes2.GRADES_RESPONSE: {
        const unitCodeTempArray:any=[];
        state.unitCodeArray.forEach(element => {
          let unit=new unitCode();
          unit.name=element.name;

          unit.gradesArray=element.grades;
            if(element.name==action.payload.unitcode)
            {
              unit.gradesArray=action.payload.data;
            }
            unitCodeTempArray.push(unit);
        });
        //console.log('111111',unitCodeTempArray);
        return {...state,
          unitCodeArray:unitCodeTempArray
        };

        
      
      }

    default: {
      return state;
    }
  }
};
export default progressCardReducer;