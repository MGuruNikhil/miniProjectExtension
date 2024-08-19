import { sendToBackground } from "@plasmohq/messaging"
import { useEffect, useState } from "react"
import CircularSpinner from "~components/LoadingAnimation"
import "~style.css"

function IndexPopup() {
    const [isLoading, setIsLoading] = useState(false)
    const [summary, setSummary] = useState("")

    useEffect(() => {
        setIsLoading(true)
        chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
            var url = tabs[0].url
            const resp = await sendToBackground({
                name: "getSummary",
                body: {
                    url: url,
                    click: false
                }
            })
            if(resp.loading) {
                setIsLoading(true)
                return
            }
            setSummary(resp.summary)
            setIsLoading(false)
        })
    }, [])

    const handleClick = (e) => {
        e.target.disabled = true
        setIsLoading(true)
        chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
            var url = tabs[0].url
            const resp = await sendToBackground({
                name: "getSummary",
                body: {
                    url: url,
                    click: true
                }
            })
            setSummary(resp.summary)
            e.target.disabled = false
            setIsLoading(false)
        })
    }

    return (
        <div className="bg-black text-white w-[300px] p-4 flex flex-col items-center justify-center gap-2">
            <p className="font-black text-lg">Saar.AI</p>
            <button onClick={handleClick} className={`min-w-[100px] p-2 rounded-lg bg-[#7289da] ${isLoading && "bg-gray-500"} font-bold flex items-center justify-center`} disabled={isLoading}>
                {isLoading ? <CircularSpinner /> : <>Get Summary</>}
            </button>
            {isLoading && (
                <p className="text-sm">Summarizing the video will take a while, please wait. Don't close the popup, if you already closed it once then close the popup and open it after some time for the summary.</p>
            )}
            {(summary && summary.length != 0) && (
                <p className="bg-gray-700 rounded-lg p-2 overflow-auto">{summary}</p>
            )}
        </div>
    )
}

export default IndexPopup
