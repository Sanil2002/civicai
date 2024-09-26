import emptyfile from "../../../../../../constants/images/emptyFile.jpg"
import PaginationComponent from "../pageination/pageinationComponent"
import Sort from "./sort"
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
// import "react-loading-skeleton/dist/skeleton.css"
// import Lottiefy from "../../../../../../atom/Lottie/lottie"
// import noData from "../../../../../../atom/Lottie/nodata.json"
// import { TableTitles } from "../../../../services/interfaces";

function Table(props: {
    tableTitles: any[]
    tableData: any
    tableClass?: string
    headClass?: string
    mainClass?: string
    dataExist?: number
    handleTableAction?: (args: string) => void
}) {
    const {
        tableTitles,
        tableData,
        tableClass,
        headClass,
        mainClass,
        handleTableAction,
        dataExist,
    } = props
    console.log("tableData", tableData)

    

    const handlePageChange = () =>{

    }

    return (
        <div className="h-full flex  flex-col gap-[12px]">
            
        <div
            data-testid="table"
            className={` table-fix-head block mx-auto w-full overflow-auto ${mainClass}   flex-1 `}
        >
            <table className={`${tableClass} table-fixed w-full `}>
                <thead className="text-xs sticky top-0 z-10">
                    <tr className="">
                        {tableTitles?.map((node: any, index: number) => {
                            return (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`${node.width ? node.width : " w-auto text-left "} ${node?.classname} px-3 py-1.5 text-[15px] text bg-[#FEFDFB]`}
                                >
                                    {node.type === "checkbox" && node?.selectAll ? null : (
                                        // <Checkbox className="" checked={node?.selectAll} onChange={() => null} />
                                        <div
                                            className={`flex 
                   items-center  font-semibold text-[#543D37] text-sm gap-[10px]`}
                                        >
                                            <div className="">{node?.title}</div>
                                            {node?.sort && (<>
                                                <a href="#">{node?.icon} </a>
                                                <Sort node={node} tableTitles={tableTitles} handleTableAction={handleTableAction} />
                                            </>)
                                            }
                                        </div>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className="relative ">
                    {
                        // dataExist || tableData === undefined 
                        true ? (
                            tableData?.length ? (
                                tableData?.map((node: any, index: number) => {
                                    const rowColorClass = index % 2 === 0 ? "bg-[#FBFBFF]" : "bg-[#F2F4FB]"
                                    console.log("node", node)
                                    return (
                                        <tr
                                            key={index}
                                            className={`${rowColorClass} first-letter:cursor-pointer cursor-default hover:bg-[#FEF4E9] hover:shadow-lg  group hover:-translate-y-[0.001px] duration-100
                                            }`}
                                        >
                                            {tableTitles?.map((column: any, colIndex: number) => {
                                                console.log("node11", column.key, node)
                                                return (
                                                    <td
                                                        key={colIndex}
                                                        className={`p-3 text-[#543D37]`}
                                                    >
                                                        {column.type === "checkbox" ? null : column.type === // /> //   onChange={() => null} //   checked={node[column.key]} // <Checkbox
                                                            "badge" ? (
                                                            <div className=" rounded-full bg-[lightgreen] px-4 py-2 inline-block">
                                                                {node[column.key]}
                                                            </div>
                                                        ) : column.type === "chips" ? (
                                                            node[column.key].map((item: any) => {
                                                                return (
                                                                    <div className="rounded-full bg-[#dddddd] mx-1.5 px-4 py-2 inline-block">
                                                                        {item[column.props.display]}
                                                                    </div>
                                                                )
                                                            })
                                                        ) : column.type === "icons" ? (
                                                            column.childrens.map((item: any) => {
                                                                return (
                                                                    <div
                                                                        onClick={() => item.action(node)}
                                                                        className="inline-block px-2 cursor-pointer hover:text-primary"
                                                                    >
                                                                        {item.icon}
                                                                    </div>
                                                                )
                                                            })
                                                        ) : column.type === "hover" ? (
                                                            <div className="flex px-4 py-2 rounded-full hover:text-[#fff] justify-between">
                                                                <div>{node[column?.key]}</div>
                                                                <div>
                                                                    {column.childrens.map((item: any) => {
                                                                        return (
                                                                            <div
                                                                                onClick={() => {
                                                                                    if (
                                                                                        item.action === "call" &&
                                                                                        handleTableAction
                                                                                    )
                                                                                        handleTableAction(node.number)
                                                                                }}
                                                                                className="inline-block px-1 invisible group-hover:visible text-white-svg cursor-pointer group-hover:text-primary"
                                                                            >
                                                                                {item.icon}
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            node[column.key]
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            ) : (
                                <div className="absolute top-20 flex flex-col w-full -ml-8 justify-center items-center ">
                                    {/* <Lottiefy loop={true} json={noData} height={150} width={150} /> */}
                                    {/* <img src={emptyfile} className="w-fit" alt="" /> */}
                                    <div className="text-[#C4C4C4] text-lg py-2">
                                        No data found!
                                    </div>
                                </div>
                            )
                        ) : (
                            <tr>
                                {/* <SkeletonTheme
                                baseColor="#FAFAF7"
                                highlightColor="#e5e5e1"
                                borderRadius="0.4rem"
                                duration={4}
                            >
                                {tableTitles?.map((column: any, colIndex: number) => {
                                    return (
                                        <td
                                            key={"row" + colIndex}
                                            id={"row" + colIndex}
                                            className={`w-fit mt-4 pr-4 text-[#543D37] text-base relative `}
                                        >
                                            <Skeleton
                                                style={{ marginBottom: 10 }}
                                                height={"45px"}
                                                count={5}
                                            />
                                        </td>
                                    )
                                })}
                            </SkeletonTheme> */}
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
        <PaginationComponent currentPage={1} itemsPerPage={5} totalItems={25} onPageChange={handlePageChange}/>
        </div>
    )
}

export default Table