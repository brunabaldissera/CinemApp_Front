export default function Titulo(props: any) {
    return (
      <div className={`flex flex-col justify-center bg-gradient-to-r from-red-500 to-red-700 text-white rounded-t-md`}>
        <h1 className="px-5 py-2 text-2xl">{props.children}</h1>
        <hr className="border-2 border-white" />
      </div>
    );
  }