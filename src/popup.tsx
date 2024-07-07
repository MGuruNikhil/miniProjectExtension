import { useState } from "react"
import "~style.css"

function IndexPopup() {

	const [isLoading, setIsLoading] = useState(false);
	const [summary, setSummary] = useState("");

	const handleClick = (e) => {
		e.target.disabled = true;
		setIsLoading(true);
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			var url = tabs[0].url;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
			xhr.onload = function() {
				var text = xhr.responseText;
				setSummary(text);
				e.target.disabled = false;
				setIsLoading(false);
			}
			xhr.send();
		});
	}

	return (
		<div className="bg-black text-white w-[300px] p-4 flex flex-col items-center justify-center">
			<p className="font-black text-lg">Saar.AI</p>
			<button onClick={handleClick} className="p-2 rounded-lg bg-[#7289da] font-bold">
				{isLoading ? <>Loading...</> : <>Get Summary</>}
			</button>
			{(summary.length != 0) && <p className="bg-gray-700 rounded-lg p-2 overflow-auto">{summary}</p>}
		</div>
	)
}

export default IndexPopup
