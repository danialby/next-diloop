import { PageItem, RATING_ICONS } from '@/types/bookEditorTypes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface PageItemEditorProps {
    item: PageItem
    onItemChange: (field: string, value: any) => void
}

export const PageItemEditor = ({ item, onItemChange }: PageItemEditorProps) => {
    switch (item.type) {
        case 'heading':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>متن عنوان</Label>
                        <Input
                            value={item.text}
                            onChange={e => onItemChange('text', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>اندازه عنوان</Label>
                        <Select
                            value={item.size}
                            onValueChange={value => onItemChange('size', value)}
                        >
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="اندازه عنوان" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="h1">بزرگ (H1)</SelectItem>
                                <SelectItem value="h2">متوسط (H2)</SelectItem>
                                <SelectItem value="h3">کوچک (H3)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )

        case 'text':
            return (
                <div className="p-4">
                    <Label>محتوا</Label>
                    <Textarea
                        value={item.content}
                        onChange={e => onItemChange('content', e.target.value)}
                        className="mt-2 min-h-[100px]"
                    />
                </div>
            )

        case 'rating':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>سوال</Label>
                        <Input
                            value={item.question}
                            onChange={e => onItemChange('question', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>شکل آیکون</Label>
                        <div className="flex gap-4 mt-2">
                            {Object.entries(RATING_ICONS).map(([shape, Icon]) => (
                                <Button
                                    key={shape}
                                    variant={item.iconShape === shape ? 'default' : 'outline'}
                                    onClick={() => onItemChange('iconShape', shape)}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {shape === 'star' ? 'ستاره' : shape === 'heart' ? 'قلب' : 'صورتک'}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>حداکثر امتیاز</Label>
                        <Input
                            type="number"
                            min="3"
                            max="10"
                            value={item.maxRating}
                            onChange={e => onItemChange('maxRating', Number(e.target.value))}
                            className="mt-2"
                        />
                    </div>
                </div>
            )

        case 'question':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>سوال</Label>
                        <Input
                            value={item.question}
                            onChange={e => onItemChange('question', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>گزینه‌ها</Label>
                        {item.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...item.options]
                                        newOptions[index] = e.target.value
                                        onItemChange('options', newOptions)
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        const newOptions = [...item.options]
                                        newOptions.splice(index, 1)
                                        onItemChange('options', newOptions)
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => {
                                onItemChange('options', [...item.options, `گزینه ${item.options.length + 1}`])
                            }}
                        >
                            افزودن گزینه
                        </Button>
                    </div>
                </div>
            )

        case 'image':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>تصویر</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    onItemChange('url', file);
                                    onItemChange('previewUrl', previewUrl);
                                } else {
                                    onItemChange('url', null);
                                    onItemChange('previewUrl', undefined);
                                }
                            }}
                            className="mt-2"
                        />
                        {item.previewUrl ? (
                            <div className="mt-4">
                                <img
                                    src={item.previewUrl}
                                    alt="Preview"
                                    className="max-h-40 rounded-md object-contain"
                                />
                            </div>
                        ) : (
                            <div className="mt-4 h-40 bg-gray-100 rounded-md flex items-center justify-center">
                                <span className="text-gray-500 text-sm">هیچ تصویری انتخاب نشده</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <Label>توضیح تصویر (اختیاری)</Label>
                        <Input
                            value={item.caption || ''}
                            onChange={e => onItemChange('caption', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                </div>
            )
        case 'video':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>لینک ویدیو</Label>
                        <Input
                            value={item.url}
                            onChange={e => onItemChange('url', e.target.value)}
                            className="mt-2"
                            placeholder="https://example.com/video.mp4"
                        />
                    </div>
                </div>
            )

        case 'button':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>متن دکمه</Label>
                        <Input
                            value={item.text}
                            onChange={e => onItemChange('text', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>عملیات (اختیاری)</Label>
                        <Input
                            value={item.action}
                            onChange={e => onItemChange('action', e.target.value)}
                            className="mt-2"
                            placeholder="مثال: https://example.com یا #صفحه-بعدی"
                        />
                    </div>
                </div>
            )

        case 'yesNoButtons':
            return (
                <div className="space-y-4 p-4">
                    <div>
                        <Label>سوال</Label>
                        <Input
                            value={item.question}
                            onChange={e => onItemChange('question', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>متن دکمه "بله"</Label>
                        <Input
                            value={item.yesText}
                            onChange={e => onItemChange('yesText', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>متن دکمه "خیر"</Label>
                        <Input
                            value={item.noText}
                            onChange={e => onItemChange('noText', e.target.value)}
                            className="mt-2"
                        />
                    </div>
                </div>
            )

        default:
            return null
    }
}