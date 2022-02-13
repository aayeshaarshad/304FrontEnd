function Container({ children }) {
  // centered container. container-fluid
  return (
    <div className={'container px-4 bg-slate-100 overflow-scroll h-screen py-2'}>{children}</div>
    )
}

export default Container