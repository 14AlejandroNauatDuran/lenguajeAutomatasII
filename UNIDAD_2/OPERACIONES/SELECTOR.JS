function EcuArit() {//caso 1
    
  var ecuacion = document.getElementById('ecu').value; //tomamos el valor de la entrada que se introdujo.
 if(ecuacion != null){//verificamos que no sea nulo
        var expres = /\d{1,}]\s{0,}['+'|'/'|'-'|'*']\s{0,1}\d{1,}]/gi; //creamos buscador de operacion a traves de Regex
        var operacion = ecuacion.match(expres);//con el regex haremos un match y lo guardamos en la operación. 
        var i = 0; //iniciamos un contador
        var t = 't';//instancia de t de contadororal.
        var result = t + i + '=' + operacion; // a la operacion que se le hiszo match la concatenamos con la informacion con la que queremos que se imprima
        var otro = ecuacion.replace(operacion,t+i);//emplazamos el valor de la operacion en la ecuación por la contadororal
        i++;//incrementamos en u1 el contador
        var result2 = t+i+'='+otro; // y la otra operación la cocatenamos con la nueva temopral y la guardamos
        document.getElementById('para').value = result +"\n"+result2;//imprimimos los postfixs
 }else{
        document.getElementById('para').value = "No se introdujo ninguna ecuación";//si es nulo se imprime el mensaje
 };
};// fin de caso 1

//la función EcuAritAvanzado() para el caso 2, 3, 4, 5
//ojo solo acepta valores de [0-9] sin conbinación y de [a-z] sin combinación 
//ejemplos 25, er, 300, hola.
//dado a que se separa por caracter.

function EcuAritAvanzado() {

 let saltoDeLinea = "\n"; //operador global para los saltos de linea en la impresión

 function Infijo_Postfijo(infijo){
        //funcion que convertira de infijo a postfijo, ya que armamos un arbol en donde los nodos son las
        //operaciones, para que es sean después cambiados por contadororales.
        let conversorInfix = new Array();
        conversorInfix = infijo; //solo pasamos cadena en una posición de array
        //console.log("convertir  "+ conversorInfix)
        let postfix = ""; //se almacenará el resutltado 
        let pila = new Array();
        pila.push("-1"); //indicara en un futuro momento que estara vacia.
        let retorno;//almacenara los valores de retorno de las prioridades de operación
        
        for(let i = 0; i < conversorInfix.length; i++){//en el for se realizara una busqueda completa con las prioridaes, y el primer caracter de la ecuación, para su odenacion en la pila
               retorno = pila[pila.length -1]; //retono simpre valera -1
               if (BuscaOperador(conversorInfix.charAt(i)) || conversorInfix.charAt(i) == ")"){//hacemos una busqueda de parentesis
                      if (retorno == "-1") {//si no a sufrido ninguna modificación
                          pila.push(conversorInfix.charAt(i));//ese valor encontrado metelo a la pila
                      } else {// pero si el el retono ya sufrio un cambio
                             if (PrioridadOperador(conversorInfix.charAt(i)) == PrioridadOperador(retorno)) {//localizamos que tipo de operador es, con prioridad
                                    if (conversorInfix.charAt(i) == "(") {//es igual a aquel dato.
                                           pila.push(conversorInfix.charAt(i));//si lo es metelo a la pila
                                    }else{
                                           postfix += pila.pop();//saca lo que tien pila, concatena a postfix
                                           pila.push(conversorInfix.charAt(i));//y mete el nuevo valor
                                    };
                             }else if (PrioridadOperador(conversorInfix.charAt(i)) > PrioridadOperador(retorno)){//la prioridades de caracter es mayor al que se retorna
                                      pila.push(conversorInfix.charAt(i));//si lo es metelo a la pila
                                    }else if (PrioridadOperador(conversorInfix.charAt(i)) < PrioridadOperador(retorno)){//o no y es menor la prioridad del caracter que el valor retornado
                                           while (retorno != "-1" && retorno != "(") { //haz lo siguiente, el retorno es diferente a -1 y no es el valor de operador
                                                  postfix += pila.pop();//saca de la pila el caracter, y concatenalo a postfix
                                                  retorno = pila[pila.length - 1];// y retorno conviertelo en -1
                                           };
                                           pila.push(conversorInfix.charAt(i));//y mete el nuevo caracter a la pila
                                           }else if (conversorInfix.charAt(i) == ")"){//o el caracter es igual a este.
                                                  while (retorno != "(") {//mientras retorno no sea igual a ello}
                                                         postfix += pila.pop();//saca el valor de pila y concatenalo
                                                         retorno = pila[pila.length - 1];//y a retorno regresalo a -1
                                                  };
                                                  pila.pop(conversorInfix.charAt(i));//localiza el caracter, y sacalo.
                                           };
                      };
                      
                    } else {//sino del principal, haz lo siguiente
                            postfix += conversorInfix.charAt(i); //concatena el caracter
                     };//fin if el principal
                     if (i == conversorInfix.length - 1) {//si es menor a length pero igual a el tamaño -1 de length
                         while (retorno != "-1") {// mientras retorno no se -1
                            postfix += pila.pop();//pas en cada vuelta los valores de pila concatenandolo a postfix
                            retorno = pila[pila.length - 1];//a retorno reducele el tamaño de uno en uno
                          };
                     };//fin if secundario
              };//fin del for
              return postfix;//retorna el resultado de la conversion
       };//fin de la funcion infijo_postfijo
       
       //esta es la función de que se compare la busqueda del operador comparado en el valor del caracte infijo
       //en el procedimiento realizado en el if principal de la función infijo_postfijo()
       function BuscaOperador(caracter){
              if (caracter == "(" || caracter == "*" || caracter == "/" || caracter == "+" || caracter == "-") {
                     return true;
              };
              return false;
       };// fin de función

       // esta función lo que realiza, es la ordenación de las prioridades de los caracteres operadores sacados de 
       //conversorInfix, comparados con el valor establecido en la variable retorno 
       function PrioridadOperador(operador){
          
                     if (operador == "(") {
                            return 3;
                     }else{
                            if (operador == "*" || operador == "/") {
                                   return 2;
                            }else{
                                   if (operador == "+" || operador == "-") {
                                          return 1;
                                   };  
                            };
                     };             
        
       }// fin funcion PrioridadOperador()

//_________________________________________________________________________
       //aqui haremos el envio y la entrada infija, a obtencion de la respuesta en postfijo y posteriormente lo enviaremos
       //a que sea concatenado a las contadororales.

       let ecu_original = document.getElementById('ecu').value;
       if (ecu_original==""){ 
              document.getElementById('para').value= "no se ha introducido ecuación";
       }else{
       let ecu_modificado = "";
       //con el for quitamos los espación de la ecuación origina, si es que los tiene, de lo contrario, solo duplica la ecuación
       //tambien se puedo haver realizado con un ecu_original.replace(/\s{1,}/gi,'');
       for(let j = 0; j < ecu_original.length; j++){
              if(ecu_original.charAt(j) != " "){
                     ecu_modificado += ecu_original.charAt(j);
              };//fin de if
       };//fin de for
       //console.log("modi  " + ecu_modificado);
       let resultadoPostfijo = "";//recibimos el resultado de conversion
       resultadoPostfijo = Infijo_Postfijo(ecu_modificado);//enviando a la función la ecuación infija.
       //console.log("res control" + resultadoPostfijo);
       let pilaTemporal = new Array(); //almacena los contadororales
       let impresionTriplos = new Array(); //almacenara los pop de la pila, para su impresion
       /// nos serviran para enviar los caracteres de resultadoPosfijo a la función contadororales
       let operando1 = "";
       let operando2 = "";
       let signo = "";
       let n = 0;

      
              for(let k = 0; k <= resultadoPostfijo.length; k++){
                     if (BuscaOperador(resultadoPostfijo.charAt(k))) {//si es un operador haz lo siguiente, de lo contrario es un numero o letra, vete a else
                            operando1 = pilaTemporal.pop();
                    // console.log(operando1)
                            operando2 = pilaTemporal.pop();
                     //console.log(operando2)
                            signo = resultadoPostfijo.charAt(k);
                     //console.log(signo)
                            impresionTriplos.push(GeneradorTriplo(n, operando1, signo, operando2));
                            pilaTemporal.push(`t${n}`);
                            n++;
                            
                            
                            
                     }else{//por lo general los primeros dos caracteres son numero o letra en una interprestación postfija.
                            pilaTemporal.push(resultadoPostfijo.charAt(k));//introducelo a la pila en numero o letra
                     };
              };//fin for     
      
       impresionTriplos.push(` ${pilaTemporal.pop()}`);
       //console.log(impresionTriplos)
       let imprime = new Array(impresionTriplos);
       for(var i = 0; i < imprime.length; i++ ){
             var x = 'x='+'\n';
             document.getElementById('para').value= x + imprime[i];
       };return true;
}
//};
//aqui se termina el controlador
//_________________________________________________________________________________________________
function GeneradorTriplo(contador, caracter1, opera, caracter2) {
      
              if (opera == "*") {
              return `t${contador} = ${caracter2} ${"*"} ${caracter1}` + saltoDeLinea;
              //return "t"+ contador + "=" + caracter2 + "*" + caracter1 + saltoDeLinea;
              }
              if (opera == "/") {
              return `t${contador} = ${caracter2} ${"/"} ${caracter1}` + saltoDeLinea;
              //return "t"+ contador + "=" + caracter2 + "/" + caracter1 + saltoDeLinea;
              }
              if (opera == "+") {
              return `t${contador} = ${caracter2} ${"+"} ${caracter1}` + saltoDeLinea
              //return "t"+ contador + "=" + caracter2 + "+" + caracter1 + saltoDeLinea;
              }
              if (opera == "-") {
              return `t${contador} = ${caracter2} ${"-"} ${caracter1}` + saltoDeLinea
              //return "t"+ contador + "=" + caracter2 + "-" + caracter1 + saltoDeLinea;
              }
     
       return "";
   };//fin de generadorTriplo
};//fin de EcuAritAvanzado()
