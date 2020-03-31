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
