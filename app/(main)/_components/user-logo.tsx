const UserLogo = ({userName, available}: {userName: string, available: boolean}) => {

    const split = userName.split(" ");
    const firstLetter = split?.[0]?.[0]?.toUpperCase();
    const secondLetter = split?.[1]?.[0]?.toUpperCase();

    return (
        <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center relative cursor-pointer">
            <span className="text-white text-xs font-medium">{firstLetter}{secondLetter}</span>
            <div className={`w-2 h-2 rounded-full absolute top-4 left-4 ${available ? 'bg-green-400': 'bg-[#8D8D8D]'}`}/>
        </div>
    );
}
 
export default UserLogo;