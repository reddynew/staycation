import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon,Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface SimpleBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    id: number;
    name: string;
    location: string;
    
    price: number;
    description: string;
    image: string;
    latitude?: number;
    longitude?: number;
  };
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
  onBook: () => void;
  guests:number
  setGuests: (e:number)=>void
}

export const BookingDialog = ({
  isOpen,
  onClose,
  hotel,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  onBook,
  guests,
  setGuests,
}: SimpleBookingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {hotel.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Check-in</Label>
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
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

              />
            </PopoverContent>
          </Popover>
        </div>
          </div>

          <div>
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
                    Check-out
                  </span>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                    <span className="text-sm truncate">
                      {checkOut ? format(checkOut, "MMM dd yyyy") : "Add date"}
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
                disabled={(date) => date < checkIn}
              />
            </PopoverContent>
          </Popover>
        </div>
          </div>
          </div>
          <div>
                      <Label>Number of Tickets</Label>
                      <div className="flex items-center gap-2">
                        <Input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        />
                        <Users className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Price per ticket</span>
                        <span>INR {hotel.price}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>INR {hotel.price* guests}</span>
                      </div>
                    </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onBook}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
