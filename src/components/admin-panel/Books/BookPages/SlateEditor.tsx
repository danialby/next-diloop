// Import Slate editor factory and plugins
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { useMemo, useState } from 'react'

const SlateEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [slateValue, setSlateValue] = useState<Descendant[]>(
        value ? JSON.parse(value) : [
            {
                type: 'paragraph',
                children: [{ text: '' }],
            },
        ]
    )

    const handleChange = (newValue: Descendant[]) => {
        setSlateValue(newValue)
        onChange(JSON.stringify(newValue))
    }

    return (
        <div className="mt-2 min-h-[100px] border rounded-md p-2 bg-white">
            <Slate editor={editor} value={slateValue} onChange={handleChange}>
                <Editable
                    className="min-h-[100px]"
                    placeholder="متن خود را اینجا بنویسید..."
                />
            </Slate>
        </div>
    )
}