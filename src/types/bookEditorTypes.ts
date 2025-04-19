import {
    BookOpenText,
    Check,
    CheckSquare,
    Heading1,
    Heart,
    ImageIcon,
    List,
    Smile,
    Star,
    Text,
    Video,
} from 'lucide-react'

export type PageItemType = 'heading' | 'text' | 'rating' | 'question' | 'image' | 'video' | 'button' | 'yesNoButtons'

interface BasePageItem {
    id: string
    type: PageItemType
}

export interface HeadingItem extends BasePageItem {
    type: 'heading'
    text: string
    size: 'h1' | 'h2' | 'h3'
}

export interface TextItem extends BasePageItem {
    type: 'text'
    content: string
}

export interface RatingItem extends BasePageItem {
    type: 'rating'
    question: string
    iconShape: 'star' | 'heart' | 'smiley'
    maxRating: number
}

export interface QuestionItem extends BasePageItem {
    type: 'question'
    question: string
    options: string[]
}

export interface ImageItem extends BasePageItem {
    type: 'image'
    url: string | File | null  // Allow null for empty state
    caption?: string
    previewUrl?: string
}

export interface VideoItem extends BasePageItem {
    type: 'video'
    url: string
}

export interface ButtonItem extends BasePageItem {
    type: 'button'
    text: string
    action: string
}

export interface YesNoButtonsItem extends BasePageItem {
    type: 'yesNoButtons'
    question: string
    yesText: string
    noText: string
}

export type PageItem = HeadingItem | TextItem | RatingItem | QuestionItem | ImageItem | VideoItem | ButtonItem | YesNoButtonsItem

export interface Page {
    id: string
    title: string
    items: PageItem[]
}

export const PAGE_ITEM_TYPES = [
    { type: 'heading', icon: Heading1, color: 'blue', label: 'عنوان' },
    { type: 'text', icon: Text, color: 'blue', label: 'متن' },
    { type: 'rating', icon: Star, color: 'yellow', label: 'امتیازدهی' },
    { type: 'question', icon: List, color: 'purple', label: 'سوال چند گزینه‌ای' },
    { type: 'image', icon: ImageIcon, color: 'green', label: 'تصویر' },
    { type: 'video', icon: Video, color: 'green', label: 'ویدیو' },
    { type: 'button', icon: CheckSquare, color: 'pink', label: 'دکمه' },
    { type: 'yesNoButtons', icon: Check, color: 'purple', label: 'بله/خیر' },
] as const

export const RATING_ICONS = {
    star: Star,
    heart: Heart,
    smiley: Smile,
}

export const COLOR_CLASSES = {
    blue: {
        button: 'bg-blue-50 hover:bg-blue-100 border-blue-100 hover:border-blue-200 text-blue-600 hover:text-blue-700',
        pageItem: 'border-blue-500 bg-blue-50 text-blue-600',
    },
    green: {
        button: 'bg-green-50 hover:bg-green-100 border-green-100 hover:border-green-200 text-green-600 hover:text-green-700',
        pageItem: 'border-green-500 bg-green-50 text-green-600',
    },
    yellow: {
        button: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-100 hover:border-yellow-200 text-yellow-600 hover:text-yellow-700',
        pageItem: 'border-yellow-500 bg-yellow-50 text-yellow-600',
    },
    purple: {
        button: 'bg-purple-50 hover:bg-purple-100 border-purple-100 hover:border-purple-200 text-purple-600 hover:text-purple-700',
        pageItem: 'border-purple-500 bg-purple-50 text-purple-600',
    },
    pink: {
        button: 'bg-pink-50 hover:bg-pink-100 border-pink-100 hover:border-pink-200 text-pink-600 hover:text-pink-700',
        pageItem: 'border-pink-500 bg-pink-50 text-pink-600',
    },
} as const