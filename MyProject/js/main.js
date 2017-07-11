( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "one" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );
} () );

var code='';

function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}

function addnum(x,typing) {
	switch(typing) {
	case 'com':
		code=code+'|'+x;
		break;
	case 'num':
		code=((isNumber(document.getElementById('workarea').value.charAt(document.getElementById('workarea').value.length-1))) || (document.getElementById('workarea').value.charAt(document.getElementById('workarea').value.length-1)==='.')) ? code+x:code+'|'+x;
		break;	
	}
	if (document.getElementById('workarea').value==='0') document.getElementById('workarea').value='';
	document.getElementById('workarea').value=document.getElementById('workarea').value+x;
	console.log('CODE = ' + code);
}
 
function cleararea() {
	code='';
	document.getElementById('workarea').value='0';
	console.log('CODE has been cleared.');
	console.log('CODE = ' + code);
}

function skobka() {
	var z;
	z = (isNumber(document.getElementById('workarea').value.charAt(document.getElementById('workarea').value.length-1))) ? ')' : '(';
	if (document.getElementById('workarea').value==='0') document.getElementById('workarea').value='';
	code=code+'|'+z;
	document.getElementById('workarea').value=document.getElementById('workarea').value+z;
	console.log('CODE = ' + code);
}

function findmeskobki(start,stop,stroka) {
	var a=0, b=0;
	var flag=0;
	var strochka='';
	var level=0;
	var helper='';
	for (var i = start; i < stop+1; i++){console.log('string: '+stroka+', code.charAt('+i+') = '+stroka.charAt(i)+', skob level = '+level+', current string = '+strochka);
	if ((flag===2)&&(level===0)){flag=0; console.log('STRING HAS BEEN FOUND: '+strochka); i=i-strochka.length; helper=findmeskobki(0,strochka.length,strochka); i=i+helper.length; console.log('Replasing in ['+stroka+']... ['+('('+strochka)+'] => ['+resultskobki(strochka,a,b)+']'); stroka=stroka.replace(('('+strochka), resultskobki(strochka,a,b)); console.log('Result replasing: '+stroka); a=0; b=0; strochka=''; }
	if (level>0) {strochka=strochka+stroka.charAt(i);}
	if (stroka.charAt(i)===')'){b=i; flag=2; level=level-1;}
	if (stroka.charAt(i)==='('){a=i; flag=1; level=level+1;}
	}
	console.log('GET STRING: '+stroka);
	return stroka;
}

function result() {
		console.log(document.getElementById('workarea').value);
		code=document.getElementById('workarea').value;
	var resultat=0;
	var perem='';
	var flag=0;
	var globalflag=0;
	var a=0, b=0;
	var strochka='';
	
	//while (globalflag < 1){
	//for (var i = 0; i < code.length; i++){console.log('code.charAt('+i+')='+code.charAt(i));
	//	if (flag===1) {strochka=strochka+code.charAt(i);}
	//	if (code.charAt(i)===')'){b=i; flag=2;}
	//	if ((code.charAt(i)==='(')&&(flag===0)){a=i; flag=1;}
	//	if (flag===2){flag=0; code=code.replace(('('+strochka), resultskobki(strochka,a,b)); 
		//console.log('AAAAAAAAAAA! '+code+ ' '+('('+strochka)+ ' c '+ resultskobki(strochka,a,b)+' result '+ code.replace(('('+strochka), resultskobki(strochka,a,b)));
	//	i=i-strochka.length;
	//	a=0; b=0; strochka=''; }
	//}
	//}
	resultat=findmeskobki(0,code.length,code);
	console.log('RESULT = ' + resultat);
}



function resultskobki (skobki, startpos, stoppos) {
	var perem='0';
	var resultat2=0;
	var skobkitext=skobki;
	var i=0;
	var command='+';
	while (isNumber(skobkitext.charAt(i))) {
		resultat2=parseFloat(resultat2+skobkitext.charAt(i));
		console.log('[Скобочный цикл]: result='+resultat2);
		i=i+1;
	}
	console.log('resultat2='+resultat2);
	for (var k = i; k < skobkitext.length; k++) {
		console.log('[Результивный цикл]: skobkitext.charAt('+k+')='+skobkitext.charAt(k));
		if ((isNumber(skobkitext.charAt(k)))||(skobkitext.charAt(k)==='.')) {
			perem=perem+skobkitext.charAt(k)
			console.log('[Результивный цикл]: perem='+perem);
		} else {
			switch(skobkitext.charAt(k)) {
			case '+':
				resultat2=againfunc(command,resultat2,perem);
				perem='0';
				command='+'
				console.log('[Результивный цикл]: command='+command);
				break;
			case '-':
				resultat2=againfunc(command,resultat2,perem);
				perem='0';
				command='-'
				console.log('[Результивный цикл]: command='+command);
				break;
			case ')':
				resultat2=againfunc(command,resultat2,perem);
				perem='0';
				command='+'
				console.log('[Результивный цикл]: command='+command);
				break;
			//case '(':
			//	var p=k
			//	while (skobkitext.charAt(k)!===')') 
			//	break;
			}
		}
		console.log('[Скобочный цикл]: I='+i+', K='+k+', skobkitext.length='+skobkitext.length+', perem='+perem+', skobkitext.charAt('+k+')='+skobkitext.charAt(k));
	}
	return resultat2;
}

function againfunc(command,a,b) {
	var resultat007=0;
	console.log('DO: '+parseFloat(a)+command+parseFloat(b));
	switch(command) {
	case '+':
		resultat007=parseFloat(a)+parseFloat(b);
		break;
	case '-':
		resultat007=parseFloat(a)-parseFloat(b);
		break;
	}
	console.log('RESULTAT007 = '+resultat007);
	return resultat007;
}