<script type="text/tmpl" id="home-view">
    <div class="post-list">
    <div class="mobile-toggle">+</div>
         {[ if(posts.length) { ]}
            {[ _.each(posts, function(post){ 
                ]}

                <article class="post" data-year="{{ post.get('date') }}" data-id="{{ post.get('ID') }}">
                    <h3>
                        <a class="post-link" href="<?php get_bloginfo('url'); ?>/#posts/{{ post.get('ID') }}/">{{ post.get('title') }}</a>
                    </h3>

                    <img src="{{ post.get('custom_meta')['photo'] }}"  style="visibility: hidden; height: 0px; width: 0px;"/>

                    <div class="info">
                        <div class="info-title">{{ post.get('custom_meta')['artist'] }}</div>
                        <div class="info-pipe"> | </div>
                        <div class="info-type">{{ post.get('custom_meta')['run_time'] }}</div>
                    </div>
                </article>

            {[ }); ]}

        {[ } else { ]}

            <h2>No posts found</h2>

        {[ } ]}
    </div>
</script>

<script type="text/tmpl" id="single-post-view">
    <div class="post-list">
        <article class="post">

                    <img class="post-image" src="{{ post.get('custom_meta')['photo'] }}" />
                    <h1 class="post-title">{{ post.get("title") }}</h1>
                    <h2 class="post-artist">{{ post.get('custom_meta')['artist'] }}</h2>

                    <div class="post-copy">{{ post.get('custom_meta')['copy'] }}</div>

                    <div class="info">
                        {[ if(post.get('custom_meta')['cat_number']) { ]}<div class="info-meta">{{ post.get('custom_meta')['cat_number'] }}</div>{[ } ]}
                        {[ if(post.get('custom_meta')['run_time']) { ]}<div class="info-meta">{{ post.get('custom_meta')['run_time'] }}</div>{[ } ]}
                        {[ if(post.get('custom_meta')['edition_number']) { ]}<div class="info-meta">{{ post.get('custom_meta')['edition_number'] }}</div>{[ } ]}
                        {[ if(post.get('custom_meta')['extra_info']) { ]}<div class="info-meta">{{ post.get('custom_meta')['extra_info'] }}</div>{[ } ]}
                    </div>

                    {[ if(post.get('custom_meta')['soundcloud_url']) { ]}
                    <div class="audio-play" data-url="{{post.get('custom_meta')['soundcloud_url'] }}"></div>
                    {[ } ]}
                </article>
    </div>
</script>