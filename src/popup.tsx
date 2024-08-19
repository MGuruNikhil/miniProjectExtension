import { sendToBackground } from "@plasmohq/messaging"
import { useEffect, useState } from "react"
import CircularSpinner from "~components/LoadingAnimation"
import "~style.css"

function IndexPopup() {
    const [isLoading, setIsLoading] = useState(false)
    const [summary, setSummary] = useState("")
    const [summarizing, setSummarizing] = useState(false)
    const [bScriptVideoId, setBScriptVideoId] = useState("")
    const [videoId, setVideoId] = useState("")

    useEffect(() => {
        setIsLoading(true)
        chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
            let url = tabs[0].url
            setVideoId(url.includes('=') ? url.split('=')[1] : null)
            const resp = await sendToBackground({
                name: "getSummary",
                body: {
                    url: url,
                    click: false
                }
            })
            if (resp.loading) {
                setIsLoading(true)
                setSummarizing(true)
                return
            }
            setSummary(resp.summary)
            setBScriptVideoId(resp.videoId)
            setSummarizing(false)
            setIsLoading(false)
        })
    } , [])

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (summarizing) {
            intervalId = setInterval(async () => {
                setIsLoading(true)
                chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
                    let url = tabs[0].url
                    setVideoId(url.includes('=') ? url.split('=')[1] : null)
                    const resp = await sendToBackground({
                        name: "getSummary",
                        body: {
                            url: url,
                            click: false
                        }
                    })
                    if (resp.loading) {
                        setIsLoading(true)
                        setSummarizing(true)
                        return
                    }
                    setSummary(resp.summary)
                    setBScriptVideoId(resp.videoId)
                    setSummarizing(false)
                    setIsLoading(false)
                })
            }, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [summarizing]);

    const handleClick = (e) => {
        e.target.disabled = true
        setIsLoading(true)
        chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
            let url = tabs[0].url
            setVideoId(url.includes('=') ? url.split('=')[1] : null)
            const resp = await sendToBackground({
                name: "getSummary",
                body: {
                    url: url,
                    click: true
                }
            })
            setSummary(resp.summary)
            setBScriptVideoId(resp.videoId)
            e.target.disabled = false
            setIsLoading(false)
        })
    }

    return (
        <div className="bg-black text-white w-[300px] p-4 flex flex-col items-center justify-center gap-2">
            <p className="font-black text-lg">Saar.AI</p>
            <button onClick={handleClick} className={`min-w-[100px] p-2 rounded-lg bg-[#7289da] ${isLoading || videoId === bScriptVideoId ? "bg-gray-500" : ""} font-bold flex items-center justify-center ${isLoading || videoId === bScriptVideoId ? "cursor-default" : ""}`} disabled={isLoading || videoId === bScriptVideoId}>
                {isLoading ? <CircularSpinner /> : <>Get Summary</>}
            </button>
            {isLoading && (
                <p className="text-sm">Summarizing the video will take a while, please wait.</p>
            )}
            {(summary && summary.length !== 0) && (
                <p className="bg-gray-700 rounded-lg p-2 overflow-auto">{summary}</p>
            )}
        </div>
    )
}

export default IndexPopup
