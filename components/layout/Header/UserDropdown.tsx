import * as React from "react"
import Link from "next/link"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/actions/auth.actions"
import { ArrowDown, Gift, LogOut, Settings } from "lucide-react"
import { fetchUserDashboard, getUserInfo } from "@/actions/user.actions"
import { CommonDictionary } from "@/types/dictionary"

type IUserDropdownProps = {
    dictionary: CommonDictionary;
    currentLanguage: string;
}

export default async function UserDropdown({ dictionary, currentLanguage }: IUserDropdownProps) {
    const { userInfo: user } = await getUserInfo()
    const { isNeighbor, neighborDesc } = await fetchUserDashboard()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="[&:has(svg)]:px-0 relative rounded-full  bg-transparent">
                    <Avatar className="h-9 w-9 bg-foreground/5">
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <ArrowDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 space-y-2 py-4 px-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="leading-none text-space-blue-muted text-md">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-row items-center">
                        <p className="mr-2 text-muted-foreground">{dictionary["userDropdown.roomNumber"]}</p>
                        <p className="text-md font-semibold">
                            {user.userTypeId}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-row items-center">
                        <p className="mr-2 text-muted-foreground">{dictionary["userDropdown.balance"]} </p>
                        <p className="text-md font-semibold">
                            100 $
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isNeighbor && <><DropdownMenuLabel className="font-normal">
                    <div className="flex flex-row items-center">
                        <p className="text-sm font-semibold">
                            {neighborDesc}
                        </p>
                    </div>
                </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </>
                }
                <DropdownMenuGroup className="space-y-4 mt-4">
                    <DropdownMenuItem className=" border-space-blue-muted border-2 focus:bg-muted-foreground/10 focus:text-white bg-white">
                        <Link className="flex flex-row items-center flex-1" href={`/${currentLanguage}/cashbacks`}>
                            <Gift className="mr-2 h-4 w-4 text-space-blue-muted" />
                            <span className="text-space-blue-muted">{dictionary["userDropdown.bonuses"]}</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" border-space-blue-muted border-2 focus:bg-muted-foreground/10 focus:text-white bg-white">
                        <Link className="flex flex-row items-center flex-1" href={`/${currentLanguage}/settings`}>
                            <Settings className="mr-2 h-4 w-4 text-space-blue-muted" />
                            <span className="text-space-blue-muted">{dictionary['sidenav.settings']}</span>
                        </Link>
                    </DropdownMenuItem>
                    <form action={logout} className="w-full">
                        <button type="submit" className="w-full text-left">
                            <DropdownMenuItem className=" bg-space-blue-muted focus:bg-space-blue-muted/90 focus:text-white text-white">
                                <div className="flex flex-row items-center flex-1">
                                    <LogOut className="mr-2 h-4 w-4 text-white" />
                                    <span>{dictionary["header.log_out"]}</span>
                                </div>
                            </DropdownMenuItem>
                        </button>
                    </form>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}