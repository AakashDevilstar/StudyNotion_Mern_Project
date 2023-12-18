import React from 'react'

const Stat=[
    {count:"5K",label:"Active Student"},
    {count:"10+",label:"Mentor"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"},
]

function Stats() {
  return (
    <section>
        <div>
            <div className='flex'>
                {
                    Stat.map((data,idx)=>{
                        return (
                            <div key={idx}>
                                <h1>{data.count}</h1>
                                <h2>{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Stats
