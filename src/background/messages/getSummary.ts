import type { PlasmoMessaging } from "@plasmohq/messaging"
import axios from "axios"

var tempVideoId = ""
var tempSummary = ""
var isSummarizing = false

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    if(isSummarizing) {
        res.send({
            summary: "",
            loading: true
        })
        return
    }
    const { url } = req.body
    const videoId = url.includes('=') ? url.split('=')[1] : null
    if(videoId === tempVideoId) {
        res.send({
            summary: tempSummary,
            loading: false
        })
        return
    }
    if(req.body.click) {
        isSummarizing = true
        try {
            const response = await axios.get("http://127.0.0.1:5000/summary", {
                params: { url: url }
            })
            const result: { summary: string, video_id: string } = response.data
            console.log(result)
            tempVideoId = result.video_id
            tempSummary = result.summary
            isSummarizing = false
            res.send({
                summary: result.summary,
                loading: false
            })
        } catch (error) {
            isSummarizing = false
            console.error("Failed to fetch summary:", error)
            res.send({
                summary: "",
                loading: false
            })
        }
    } else {
        res.send({
            summary: "",
            loading: false
        })
    }
}

export default handler