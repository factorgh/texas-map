"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MapPinCheck } from "lucide-react";
import mockDrillData from "@/api/data";

type Props = {};

const ITEMS_PER_PAGE = 10;

function AllDrills({}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockDrillData.length / ITEMS_PER_PAGE);

  // Get the items for the current page
  const currentItems = mockDrillData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full h-full mt-16  p-1">
      <div>
        <h3 className="text-2xl my-4 font-bold text-white flex items-center">
          All Drills{" "}
          <span className="ml-2">
            <MapPinCheck />
          </span>
        </h3>
      </div>
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold ">Title</TableHead>
            <TableHead className="font-bold">Longitude</TableHead>
            <TableHead className="font-bold">Latitude</TableHead>
            <TableHead className="font-bold">desrciption</TableHead>
            <TableHead className="text-right font-bold">Entity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.title}</TableCell>
              <TableCell>{invoice.lng}</TableCell>
              <TableCell>{invoice.lat}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell className="text-right">{invoice.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          color="secondary"
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="self-center  text-[10px] text-white">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="default"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default AllDrills;
