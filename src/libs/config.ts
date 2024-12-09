export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

export const Messages = {
	error1: "Something went wrong!",
	error2: "Please login first!",
	error3: "Please fulfill all inputs!",
	error4: "Message is empty!",
	error5: "Only images with jpeg, jpg, png format allowed!",
};

export function slashRemover(str: string): string {
	const arr = str.split("");
	if (arr[0] === "/") {
		arr.shift();
		return arr.join("");
	} else return arr.join("");
}
