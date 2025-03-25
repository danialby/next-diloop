// components/ui/Pagination.tsx
import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
                                                         currentPage,
                                                         totalPages,
                                                         onPageChange,
                                                     }) => {
    return (
        <Pagination dir="rtl">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                        {page === currentPage ? (
                            <PaginationLink isActive>
                                {page}
                            </PaginationLink>
                        ) : (
                            <PaginationLink onClick={() => onPageChange(page)}>
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;