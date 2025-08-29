type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'|'hidden';

type CustomInputProps = {
    icon?: React.ReactNode;
    placeholder?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    id:string,
    type?: InputType,
    required:boolean;
    register?: any; 
};

const CustomInput: React.FC<CustomInputProps> = ({
    icon,
    placeholder,
    value,
    onChange,
    name,
    type = 'text',
    id,
    required =false,
   register,
  
}) => {
    return (
        <div className="input_wrapp">
            <div className="input_container">
                {icon && <div className="input_icon">{icon}</div>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    id={id}
                    required={required}
                    {...register}

                />
            </div>
        </div>
    );
};

export default CustomInput;