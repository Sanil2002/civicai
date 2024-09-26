import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface DropDownProps {
  fieldName: string
  defaultValue?: string
  placeholder?: string
  value: string
  childrens: DropchildObj[] | []
  childClass?: React.ComponentProps<'div'>['className']
}

interface DropchildObj {
  name: string
  value: string
  placeholder?: string
}

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  node: DropDownProps
  handleChange: (key: string, value: string) => void

}

const DropDownCmp = ({ node, handleChange }: Props) => {

  const [value, setValue] = useState(node.value);

  React.useEffect(() => {
    setValue(node?.value)
  }, [node?.value])

  const handleDDChange = (field: string, value: string) => {
    handleChange(field, value)
    setValue(value)
  }

  console.log(node);
  return (
    <Select
      onValueChange={(value: string) => handleDDChange(node.fieldName, value)}
      defaultValue={node.defaultValue}
      name={node?.fieldName}
      value={value}
    >
      <SelectTrigger className={node?.childClass}>
        <SelectValue placeholder={node.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {node.childrens?.map((element, index) => (
          <SelectItem key={index} value={element.value}>
            {' '}
            {element.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { DropDownCmp }

{
  /* <DropDown
node={
  {
    fieldName: 'string',
    // defaultValue: 'string3',
    placeholder: 'Strings',
    childClass: "w-[180px]",
    childrens: [{
      name: 'string1',
      value: 'string1',
      placeholder: 'string1'
    }, {
      name: 'string2',
      value: 'string2',
      placeholder: 'string2'
    }, {
      name: 'string3',
      value: 'string3',
      placeholder: 'string3'
    }],
  }
}
handleChange={() => alert("Dropdown changed")}
/> */
}