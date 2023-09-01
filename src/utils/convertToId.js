

exports.convertToken =(token)=>{
    const id = jwt.verify(token, process.env.SECRET_KEY)
      return id.id
}

