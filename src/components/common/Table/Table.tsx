import React, { useState, useEffect } from "react";

import styles from "./Table.module.css";
import { FaFilter, FaPencil, FaRegTrashCan } from "react-icons/fa6";

import { Link } from "react-router-dom";
import Button from "../Button";

export interface Column<T> {
    header: string;
    accessor: (item: T) => any;
    type?: string;
    linkAccessor?: (item: T) => string | undefined;
}
interface TableProps<T extends { id: any }> {
    columns: Column<T>[];
    data: T[];
    handleEdit?: (item: T) => void;
    handleDelete?: (item: T) => void;
    initialFilter?: string;  // Add initial filter prop
}

export const Table = <T extends { id: any },>({ columns, data, handleEdit, handleDelete, initialFilter = "" }: TableProps<T>): JSX.Element => {
    const defaultSortColumn = "Nome";
    const [sortColumn, setSortColumn] = useState<string | null>(defaultSortColumn);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [filter, setFilter] = useState<string>(initialFilter);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        setFilter(initialFilter);
    }, [initialFilter]);

    const handleSort = (columnHeader: string) => {
        if (sortColumn === columnHeader) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnHeader);
            setSortDirection("asc");
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortColumn) return data;

        const column = columns.find(col => col.header === sortColumn);
        if (!column) return data;

        return [...data].sort((a, b) => {
            const aValue = column.accessor(a);
            const bValue = column.accessor(b);

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortDirection, columns]);

    const filteredData = sortedData.filter(item =>
        columns.some(column =>
            column.accessor(item)?.toString().toLowerCase().includes(filter.toLowerCase())
        )
    );

    return (
        <div className={styles.TableWrapper}>
            <div className={styles.filterButton}>
                <Button onClick={() => setShowFilter(!showFilter)}>
                    <FaFilter />
                </Button>
                {showFilter && (
                    <input
                        type="text"
                        placeholder="Filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={styles.filterInput}
                    />
                )}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className={styles.th} onClick={() => handleSort(column.header)}>
                                {column.header}
                                {sortColumn === column.header && (
                                    <span>{sortDirection === "asc" ? "  ▲" : "  ▼"}</span>
                                )}
                            </th>
                        ))}
                        {(handleEdit || handleDelete) && <th className={styles.th}>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr className={styles.row} key={index}>
                                {columns.map((column, columnIndex) => (
                                    column.type === "image" ?
                                        <td key={columnIndex} className={styles.td}>
                                            <img src={column.accessor(item)} alt="Imagem" />
                                        </td>
                                        :
                                        !column.accessor(item) ?
                                            <td key={columnIndex} className={styles.td}>

                                            </td>
                                            :
                                            <td key={columnIndex} className={styles.td}>
                                                <Link className={styles.link} to={`/${column.type ? column.type : ""}${column.linkAccessor ? column.linkAccessor(item) : ""}`}>
                                                    {column.accessor(item)}
                                                </Link>
                                            </td>
                                ))}
                                {(handleEdit || handleDelete) && (
                                    <td className={`${styles.td} ${styles.buttons}`}>
                                        {handleEdit && <Button onClick={() => handleEdit(item)}>
                                            <FaPencil />
                                        </Button>}
                                        {handleDelete && <Button onClick={() => handleDelete(item)}>
                                            <FaRegTrashCan />
                                        </Button>}
                                    </td>
                                )}
                            </tr>
                        )))
                        :
                        // Add a message for loading or for not found data
                        data.length == 0 ?
                            <tr>
                                <td className={styles.td}>Carregando...</td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={columns.length + 1} className={styles.td}>Nenhum dado encontrado</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};