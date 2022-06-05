export function bookIntroducrtion(infromation: any) {
    console.log(infromation)
    const {author,Introduction,book_introduction,imageUrl} = infromation 
    const text = `    <div id="detail-tag-id-2" class="book-detail-item"
    style="margin: 0px 20px; padding: 20px 0px 0px; overflow: hidden; color: #666666; font-family: tahoma, arial, 'Microsoft YaHei', 'Hiragino Sans GB', u5b8bu4f53, sans-serif; font-size: 12px; background-color: #ffffff;">
    <div class="item-mc" style="margin: 0px; padding: 18px 10px 0px;">
        <div class="book-detail-content" style="margin: 0px; padding: 0px; line-height: 24px; font-size: 14px;">

            <p style="margin: 0px; padding: 0px;">
                ${author}<br>
                <pre>${Introduction}</pre>
            </p>
        </div>
    </div>
</div>
<div id="detail-tag-id-3" class="book-detail-item"
    style="margin: 0px 20px; padding: 20px 0px 0px; overflow: hidden; color: #666666; font-family: tahoma, arial, 'Microsoft YaHei', 'Hiragino Sans GB', u5b8bu4f53, sans-serif; font-size: 12px; background-color: #ffffff;">
    <div class="item-mt" style="margin: 0px; padding: 0px; height: 25px; border-bottom: 3px solid #e4393c;">
        <h3
            style="margin: 0px; padding: 0px 0px 0px 20px; font-size: 14px; line-height: 28px; width: 99px; height: 25px; overflow: hidden; color: #ffffff; background: url('//static.360buyimg.com/item/unite/1.0.103/components/book/css/i/item.sprite.png') 0px -13px no-repeat;">
            内容简介</h3>
    </div>
    <div class="item-mc" style="margin: 0px; padding: 18px 10px 0px;">
        <div class="book-detail-content" style="margin: 0px; padding: 0px; line-height: 24px; font-size: 14px;">
            <p style="margin: 0px; padding: 0px;">
                <pre>${book_introduction}</pre>

                <br /><img style="display: block; margin-left: auto; margin-right: auto;"
                    src="${imageUrl}" alt="yjs2.png" width="400" height="400" />
            </p>
        </div>
    </div>
</div>`

    return text
}