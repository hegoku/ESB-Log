function EBCDIC_encode(char){
	var x="",y="";
	switch(char){
		case '{':
		case 'A':
		case 'B':
		case 'C':
		case 'D':
		case 'E':
		case 'F':
		case 'G':
		case 'H':
		case 'I':
			y="C";
			break;
		case '}':
		case 'J':
		case 'K':
		case 'L':
		case 'M':
		case 'N':
		case 'O':
		case 'P':
		case 'Q':
		case 'R':
			y="D";
			break;
	}
	
	switch(char){
	case '{':
	case '}':
		x="0";
		break;
	case "A":
	case "J":
		x="1";
		break;
	case "B":
	case "K":
		x="2";
		break;
	case "C":
	case "L":
		x="3";
		break;
	case "D":
	case "M":
		x="4";
		break;
	case "E":
	case "N":
		x="5";
		break;
	case "F":
	case "O":
		x="6";
		break;
	case "G":
	case "P":
		x="7";
		break;
	case "H":
	case "Q":
		x="8";
		break;
	case "I":
	case "R":
		x="9";
		break;
	}
	return y+x;
}