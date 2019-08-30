import { Alert } from 'react-native';

export default { 

    serialize : function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },

    showAlert: function(title, desc, btn1, btn2) {
        return new Promise((resolve)=>{

            Alert.alert(
                title,
                desc,
                [
                  {text: btn1, onPress: () => resolve(true)},
                ],
                {cancelable: false},
              );
    
          })
    },

}

