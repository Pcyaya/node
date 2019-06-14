module.exports = {
    //锦囊列表
    selectList() {
        var sql = ` select (@rs_id:=rs.rs_id) rs_id,
            rs.rs_title,
            concat(substr(
                if(ifnull(rs.rs_content,'')='',
                ifnull((select concat(ifnull(rsc_title,''),ifnull(rsc_content,''))
                    from(select * from ry_survival_capsule rsc
                        where ifnull(rsc.rsc_del,0)=0
                        and ifnull(rsc.rsc_title,'')<>'' and rsc_survival = @rs_id
                    union all 
                        select * 
                        from ry_survival_capsule rsc 
                        where ifnull(rsc.rsc_del,0)=0 and ifnull(rsc.rsc_content,'')<>'' and rsc_survival = @rs_id) sur
                order by rsc_id asc limit 1),''),
                rs.rs_content),1,30),'...') rs_content
            from ry_survival rs where ifnull(rs_del,0)=0 order by rs_id desc `;
        return sql;
    },
    //锦囊详情
    infoId(id) {
        var sql = ` select * from ry_survival_capsule rsc where rsc_del = 0 and rsc_survival= '${id}' `;
        return sql;
    },
    listId(id) {
        var sql = ` select * from ry_survival rs where rs_del = 0 and rs_sync = 1 and rs_id= '${id}' `;
        return sql;
    },
    //紧急电话列表
    urgentSel() {
        var sql = ` select rup.*,
                        ifnull((select t.ru_name from ry_urgent t where t.ru_id = rup.rup_urgent limit 1) ,'') ru_name 
                        from ry_urgent_phone rup 
                    where rup.rup_sync = 1 and rup.rup_del = 0 and rup.rup_urgent in(select ru.ru_id from ry_urgent ru) order by rup_id desc `;
        return sql;
    }
};