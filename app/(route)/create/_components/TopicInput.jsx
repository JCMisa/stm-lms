import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const TopicInput = ({ setTopic, setDifficultyLevel }) => {
    return (
        <div className='mt-10 w-full flex flex-col'>
            <h2>Enter the topic or paste the content</h2>
            <Textarea placeolder="Start writing here" className="mt-2 w-full bg-light/40" onChange={(e) => setTopic(e.target.value)} />

            <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
            <Select onValueChange={(value) => setDifficultyLevel(value)}>
                <SelectTrigger className="w-full bg-light/40">
                    <SelectValue placeholder="Defficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}

export default TopicInput