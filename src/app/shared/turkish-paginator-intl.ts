import { MatPaginatorIntl } from '@angular/material';

const turkishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) { return `Sayfa 0/${length}`; }

    length = Math.max(length, 0);
    page += 1;

    const totalPages = Math.ceil(length / pageSize);

    return `Sayfa ${page}/${totalPages}`;
}

export function getTurkishPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.getRangeLabel = turkishRangeLabel;
    return paginatorIntl;
}