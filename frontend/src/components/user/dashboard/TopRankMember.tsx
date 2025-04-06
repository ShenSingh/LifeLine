import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../uiComponent/table";

import Badge from "../../uiComponent/badge/Badge";

interface Order {
  id: number;
  player: {
    image: string;
    name: string;

  };
  playGame: string;

  playTime: string;
  rank: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    player: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",

    },
    playGame: "10",

    playTime: "5h 30m",
    rank: "1",
  },
  {
    id: 2,
    player: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",

    },
    playGame: "4",

    playTime: "4h 30m",
    rank: "2",
  },
  {
    id: 3,
    player: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",

    },
    playGame: "9",

    playTime: "7h 30m",
    rank: "3",
  },
  {
    id: 4,
    player: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",

    },
    playGame: "6",

    playTime: "1h 30m",
    rank: "4",
  },



];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Player
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Play Games
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Play Time
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Player Rank
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={order.player.image}
                          alt={order.player.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.player.name}
                        </span>

                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.playGame}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.playTime}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                        size="sm"
                        color={
                          order.rank <= "1" || order.rank <= "3"
                              ? "success"
                              : order.rank <= "4"
                                  ? "warning"
                                  : "error"
                        }
                    >
                      {order.rank}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
