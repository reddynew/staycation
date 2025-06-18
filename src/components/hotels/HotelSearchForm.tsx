import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // for conditional classes if you have it

interface HotelSearchFormProps {
  location: string;
  setLocation: (location: string) => void;
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
  guests: number;
  child:number;
  setGuests: (guests: number) => void;
  setchild:(child:number)=> void;
  onSearch: () => void;
}

export const HotelSearchForm = ({
  location,
  setLocation,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  child,
  setGuests,
  setchild,
  onSearch,
}: HotelSearchFormProps) => {
  return (
    <div className=" hidden md:flex flex-col items-center ">
<div className="flex items-center bg-white rounded-full shadow-md w-full max-w-4xl px-2 py-2 sticky top-10 z-10">
{/* Location */}
        <div className="flex-1 px-4 py-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Where</span>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm"
            />
          </div>
        </div>

        <div className="border-l h-6 mx-2"></div>

        {/* Check-in */}
        <div className="flex-1 px-4 py-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-auto w-full justify-start hover:bg-transparent focus:bg-transparent"
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-500">
                    Check-in
                  </span>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                    <span className="text-sm truncate">
                      {checkIn ? format(checkIn, "MMM dd") : "Add date"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="border-l h-6 mx-2"></div>

        {/* Check-out */}
        <div className="flex-1 px-4 py-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-auto w-full justify-start hover:bg-transparent focus:bg-transparent"
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-500">
                    Check-out
                  </span>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                    <span className="text-sm truncate">
                      {checkOut ? format(checkOut, "MMM dd") : "Add date"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) =>
                  date < new Date() || (checkIn ? date <= checkIn : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="border-l h-6 mx-2"></div>

        {/* Guests */}
        <div className="flex-1 px-4 py-2">
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        className="p-0 h-auto w-full justify-start hover:bg-transparent focus:bg-transparent"
      >
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium text-gray-500">
            Persons
          </span>
          <div className="flex items-center">
            <Users className="mr-2 h-3 w-3 opacity-70" />
            <span className="text-sm truncate">
              {guests} {guests === 1 ? "adult" : "adults"} & {child} {child === 1 ? "child" : "children"}
            </span>
          </div>
        </div>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-64 p-4" align="start">
      <div className="flex flex-col gap-4">
        {/* Guests Section */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Guests</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              -
            </Button>
            <span className="w-4 text-center">{guests}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => setGuests(guests + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* guests Section */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">children</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => setchild(Math.max(0, child - 1))}
              disabled={child <= 0}
            >
              -
            </Button>
            <span className="w-4 text-center">{child}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => setchild(child + 1)}
      
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</div>

        {/* Search Button */}
        <Button
          className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 ml-2"
          onClick={onSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
